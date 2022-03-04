var assert = require('assert');

const path = require("path");
var glob = require('glob');

const json_spec_reporter_summariser = require('../lib/json_spec_reporter_summariser.js')

describe('json_spec_reporter_summariser.js', function () {
  it('returns an rspec summary', function () {
    const glob = path.join(__dirname, "./fixtures/**/*.json")

    let total_of_summaries = {
      summary: {
        duration: 2.1,
        example_count: 6,
        failure_count: 0,
        pending_count: 0,
        errors_outside_of_examples_count: 0,
      },
    };

    const summariser = json_spec_reporter_summariser([glob])
    assert.deepEqual(summariser.summary, total_of_summaries.summary)
  });

  it('works with multiple globs', function () {
    const glob = path.join(__dirname, "./fixtures/**/*.json")
    const glob_2 = path.join(__dirname, "./fixtures/**/*.json")

    let total_of_summaries = {
      summary: {
        duration: 2.1,
        example_count: 6,
        failure_count: 0,
        pending_count: 0,
        errors_outside_of_examples_count: 0,
      },
    };

    const summariser = json_spec_reporter_summariser([glob, glob_2])
    assert.deepEqual(summariser.summary, total_of_summaries.summary)
  });

  it('can be stringified', function () {
    const glob = path.join(__dirname, "./fixtures/**/*.json")

    let total_of_summaries = {
      summary: {
        duration: 2.1,
        example_count: 6,
        failure_count: 0,
        pending_count: 0,
        errors_outside_of_examples_count: 0,
      },
    };

    const summariser = json_spec_reporter_summariser([glob])
    let summary = summariser.summary
    let summary_string = JSON.stringify(summary)
    console.log(summary_string)
    assert.equal(summary_string, '{"duration":2.1,"example_count":6,"failure_count":0,"pending_count":0,"errors_outside_of_examples_count":0}')
  });
});