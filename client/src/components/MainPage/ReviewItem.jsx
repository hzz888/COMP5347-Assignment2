import {useEffect, useState} from "react";
import {CommentItem} from "./CommentItem";
import "./MainPage.css"

export function ReviewItem({review, user, item, seller}) {

    const [reviewerDetails, setReviewerDetails] = useState({});

    useEffect(() => {
        async function fetchReviewerDetails() {
            try {
                const res = await fetch(`http://localhost:3001/UserPage/fetch-user-data/${review.reviewer}`);
                const data = await res.json();
                setReviewerDetails(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchReviewerDetails().then();
    }, [review, user, item, seller]);

    return (
        <>
            <div className="ReviewItem flex flex-col text-white">
                <div>Reviewer: {reviewerDetails.firstname} {reviewerDetails.lastname}</div>
                <div>Rating: {review.rating}★</div>
                <CommentItem reviewer={reviewerDetails} review={review} user={user} item={item}
                             seller={seller}></CommentItem>
            </div>
            <br/>
        </>
    )
}