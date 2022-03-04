const fs = require("fs");
var glob = require('glob');
const core = require('@actions/core');


function get_file_list(file_globs) {
  let files = []
  file_globs.forEach((arg) => {
    let new_files = glob.sync(arg)
    files.push(...new_files)
  })

  const unique_files = files.filter((x, i) => i === files.indexOf(x))
  return unique_files
}

function json_spec_reporter_summariser(file_globs) {
  const files = get_file_list(file_globs);
  core.debug(`Files to summarise: \n - ${files.join("\n - ")}`)

  let total_of_summaries = {
    summary: {
      duration: 0,
      example_count: 0,
      failure_count: 0,
      pending_count: 0,
      errors_outside_of_examples_count: 0,
    },
  };

  summaries = files.map((arg) => {
    try {
      let data = fs.readFileSync(arg, "utf8");
      data = JSON.parse(data).summary;
      return data;
    } catch (err) {
      console.error(err);
    }
  });

  summaries.forEach((summary) => {
    total_of_summaries.summary.duration += summary.duration;
    total_of_summaries.summary.example_count += summary.example_count;
    total_of_summaries.summary.failure_count += summary.failure_count;
    total_of_summaries.summary.pending_count += summary.pending_count;
    total_of_summaries.summary.errors_outside_of_examples_count +=
      summary.errors_outside_of_examples_count;
  });

  return total_of_summaries
}

module.exports = json_spec_reporter_summariser
