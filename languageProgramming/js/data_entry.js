

function data_handler(data_rank){
    slice_data = data_rank.slice(0,30);
    slice_data.forEach(function(d){
      d["values"].forEach(function(val,i){
        val["year"] = 2000 + i;
        return val;
      });
      return d;
    });
  }

queue()
.defer(d3.json, "data/creation_year.json")
.defer(d3.json, "data/issue_github_original.json")
.defer(d3.json, "data/start_github_original.json")
.defer(d3.json, "data/lang_info.json")
.await(function(error, file1, file2, file3, file4)
    {
        var creation_year = file1;
        var issues = file2;
        var starts = file3;
        var lang_info = file4;

        data_handler(starts)
        data_handler(issues)

        looper(creation_year, issues, starts, lang_info);
    }
);