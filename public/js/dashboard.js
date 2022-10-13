const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();

    if (title && contents) {
        const response = await fetch('api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, contents}),
            headers: {
                'Content-Type': 'application/json',
              },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog post');
            return;
        }
    }
}

document.querySelector('#post-blog').addEventListener('click', newPostHandler);