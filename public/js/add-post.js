console.log("adding post")

const createNewPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#post-title').value;
    const contents = document.querySelector('#post-content').value;

    if (!title && !contents){
        alert('Must have title and content');
        return;
    }

    const response = await fetch('/api/posts' , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, contents}),
    })

    console.log(response)

    // if (response.ok){
    //     document.location.reload()
    // } else{
    //     console.log("Error ")
    // }
}

document.getElementById("post-form").addEventListener("submit", createNewPost)