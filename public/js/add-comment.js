const post_id = parseInt(window.location.pathname.split("/")[2])
const createNewComment = async (event) => {
    event.preventDefault()


    const comment = document.querySelector('#comment').value;
    console.log(comment)
    if (!comment){
        alert('Must have comment');
        return;
    }
    console.log("Before fetch")
    const response = await fetch('/api/comments' , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({comment, post_id}),
    })

    console.log(response)

    if (response.ok){
        document.location.reload()
    } else{
        console.log("Error")
    }
}

document.getElementById("comment-submit").addEventListener("click", createNewComment)

