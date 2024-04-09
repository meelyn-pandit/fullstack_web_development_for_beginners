const url = new URL(location.href)
const movieId = url.searchParams.get('id')
const movieTitle = url.searchParams.get('title')

const APILINK = 'http://127.0.0.1:3000/html_frontend/movie.html/api/v1/reviews/'


const main = document.getElementById('section')
const title = document.getElementById('title')

title.innerText = movieTitle

returnReviews(APILINK)
console.log('url', url)
function returnReviews(url) {
    fetch(url + "movie/" + movieId).then((res) => res.json())
    .then((data) => {
        console.log(data)
        console.log(main)
        data.forEach(review => {
            const div_card = document.createElement('div')
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>User: </strong>${review.user}</p>
                        <p><a href="#" onclick="editReview(${review._id}, ${review.review}, ${review.user})"> Pencil emoji</a> <a href="#" onclick="deleteReview(${review._id})">Trashcan emoji</a></p>
                        </div>
                    </div>
                </div>
            `

            main.appendChild(div_row)
        })
    })
}

function editReview(id, review, user) {
    console.log(review)
    const element = document.getElementById(id)
    console.log(element)
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element.innerHTML = `
    <p><strong>Review: </strong>
    <input type="text" id="${reviewInputId}" value="${review}>
    </p>
    <p><strong>User: </strong>
    <input type="text" id="${userInputId}" value = "${user}">
    </p>
    <p><a href="#" onclick="saveReview(${reviewInputId}, ${userInputId}, ${id},)">Floppy Disc Icon</a>
    </p>
    `
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).ariaValueMax
    const user = document.getElementById(userInputId).value
    if (id) {

        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'applicataion/json, text/plain, */*',
                'Content-Type': 'applilcation/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
          .then(res => {
                console.log(res)
                location.reload()
            })

    } else {
    fetch(APILINK + 'new', {
        method: 'PUT',
        headers: {
            'Accept': 'applicataion/json, text/plain, */*',
            'Content-Type': 'applilcation/json'
        },
        body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload()
        })
    }
}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload()
    })
}
