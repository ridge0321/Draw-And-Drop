const SubmitTweet = (props) => {

  const tweetUrl = "https://google.com";
  const tweetText = String(props);

  var shareURL = (
    `https://twitter.com/intent/tweet?text=${tweetText}%20%20%23技育CAMP%20&url=${tweetUrl}`
  )
  location.href = shareURL;
}

export default SubmitTweet;