import {useState} from "react";
import "./MainPage.css"

export function CommentItem({reviewer, review, user, item, seller}) {
    const [expand, setExpand] = useState(false);
    const [shown, setShown] = useState(Boolean(review.is_shown));

    async function toggleCommentHideOrShow() {
        try {
            const res = fetch('http://localhost:3001/UserPage/toggleComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Reviewer: reviewer._id,
                    Listing_id: item._id,
                    Is_shown: !shown
                })
            })

            if (res) {
                setShown(!shown);
            }

        } catch (error) {
            console.error(error)
        }
    }


    function expandAndCollapseButton() {
        if (review.comment && review.comment.length > 200) {
            return (<button className="text-blue-400 btn max-w-[10%]"
                            onClick={() => setExpand(!expand)}>{expand ? "Less" : "More"}</button>)
        } else {
            return null
        }
    }

    function toggleHideOrShowButton() {
        if (user._id === seller._id || user._id === reviewer._id) {
            return (
                <button onClick={() => toggleCommentHideOrShow()} className="text-blue-400 btn max-w-[10%] bg-green-300">{shown ? "Hide" : "Show"}</button>
            )
        } else {
            return null
        }
    }


    if (review.comment && review.comment.length <= 200) {
        return (
            <>
                <div className={`comment-container ${!shown ? "hidden-comment" : ""}`}>
                    <div>{review.comment}</div>
                </div>
                {toggleHideOrShowButton()}
            </>
        )
    } else if (review.comment && review.comment.length > 200) {
        return (
            <>
                <div className={`comment-container ${!shown ? "hidden-comment" : ""}`}>
                    {expand ? <div>{review.comment}</div> : <div>{review.comment.slice(0, 200) + "..."}</div>}
                </div>
                {expandAndCollapseButton()}
                {toggleHideOrShowButton()}
            </>

        )
    } else {
        return <div>Comment Display Error!</div>;
    }
}
