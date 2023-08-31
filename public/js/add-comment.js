// Grabs the post id from the URL
const post_id = parseInt(window.location.pathname.split("/")[2])

// New comment function
const createNewComment = async (event) => {
    event.preventDefault()
    // Takes the value from the user input in the comment classs
    const comment = document.querySelector('#comment').value;
    // Throws error if the comment field is empty
    if (!comment){
        alert('Must have comment');
        return;
    }
    // Sends the comment value and post id through the comment POST route
    const response = await fetch('/api/comments' , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({comment, post_id}),
    })
    // Reloads the page if successful. If not, throw erro
    if (response.ok){
        document.location.reload()
    } else{
        console.log("Error")
    }
}
// Event listener for comment button
document.getElementById("comment-submit").addEventListener("click", createNewComment)

