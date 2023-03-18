const comments = document.querySelectorAll('.comment-td');
['mouseover', 'mouseout'].forEach(event => {
    comments.forEach( comment => {
        comment.addEventListener(event, () => {
            comment.classList.toggle('comment-td-withAfter');
        });
    });
});