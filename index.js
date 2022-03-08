const core = require("@actions/core");
const github = require("@actions/github");


const json_spec_reporter_summariser = require("./lib/json_spec_reporter_summariser.js");

try {
  const file_globs = core.getMultilineInput("file_globs");
  const summary = json_spec_reporter_summariser(file_globs);

  core.setOutput("duration", summary.summary.duration)
  core.setOutput("example_count", summary.summary.example_count)
  core.setOutput("failure_count", summary.summary.failure_count)
  core.setOutput("pending_count", summary.summary.pending_count)
  core.setOutput("errors_outside_of_examples_count", summary.summary.errors_outside_of_examples_count)

  core.setOutput("summary_string", JSON.stringify(summary))
} catch (error) {
  core.setFailed(error.message);
}
