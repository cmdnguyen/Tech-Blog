// Create new post function
const createNewPost = async (event) => {
    event.preventDefault()
    // Takes the value of the title and contents in the post form
    const title = document.querySelector('#post-title').value;
    const contents = document.querySelector('#post-contents').value;
    // Alerts the user to have title and contents if the fields are empty
    if (!title && !contents){
        alert('Must have title and content');
        return;
    }
    // Sends the values in a POST route to api/posts
    const response = await fetch('/api/posts' , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, contents}),
    })
    // Reloads the document if successful. If not, throws error
    if (response.ok){
        document.location.reload()
    } else{
        console.log("Error ")
    }
}
// Event listener for post button
document.getElementById("post-submit").addEventListener("click", createNewPost)



