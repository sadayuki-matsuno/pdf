$.ajax({
  type: 'GET',
  url: 'https://88kzy3jl65.execute-api.ap-northeast-1.amazonaws.com/development/greetings/hello',
  dataType: 'json',
  success: function(data) {
    //取得成功したら実行する処理
    console.log("ファイルの取得に成功しました");
  },
  error:function() {
    //取得失敗時に実行する処理
    console.log("何らかの理由で失敗しました");
  }
});
