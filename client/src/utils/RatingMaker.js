export function RatingMaker(item) {
    let rating = calculateAverageRating(item);
    rating = trimRating(rating);
    return rating;
}
function calculateAverageRating(item) {
    if (!item.reviews || item.reviews.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < item.reviews.length; i++) {
        sum += item.reviews[i].rating;
    }
    return sum / item.reviews.length;
}

function trimRating(rating) {
    if (rating === 0) return 0;
    return Math.floor(rating * Math.pow(10, 2)) / Math.pow(10, 2);
}