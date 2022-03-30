import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";


// const listComment = [{
//     id: "4",
//     content: "your idea sucks 1",
//     created_at: "23:59 1-1-2022",
//     closed_date: "23:59 30-4-2023"
// },
// {
//     id: "5",
//     content: "your idea sucks 2",
//     created_at: "23:59 1-1-2022",
//     closed_date: "23:59 30-4-2023"
// },
// {
//     id: "6",
//     content: "your idea sucks 3",
//     created_at: "23:59 1-1-2022",
//     closed_date: "23:59 30-4-2023"
// }];

// const Comment = () => {
//     return (
//         <>
//             <div>
//                 <form>
//                     <input type="textarea" name="content" placeholder="Write something"></input>

//                     {/* author of cmt can be hidden */}
//                     {/* <input type="checkbox">Comment as Anonymous</input> */}
//                     <button type="submit">Post</button>
//                 </form>
//             </div>
//             <Divider></Divider>
//             <CommentList></CommentList>
//         </>
//     )
// }

// const CommentList = ({ id }) => {

//     let commentList = listComment;
//     console.log(commentList)

//     return (
//         <h1>
//             {
//                 commentList.map((comment) => (
//                     <Card style={{ margin: "2rem" }} >
//                         {comment.content}
//                         <Divider></Divider>
//                         {comment.created_at}
//                     </Card>
//                 ))
//             }

//         </h1>
//     );
// }




const Comment = ({ comment,
    replies,
    setActiveComment,
    activeComment,
    updateComment,
    createComment,
    parentId,
    currentUserId, }) => {


    const canDelete = currentUserId === comment.userId && replies.length === 0;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId;
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment._id;
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment._id;
    const replyId = parentId ? parentId : comment._id;
    const navigate = useNavigate();
    const deleteComment = async () => {
        fetch('http://localhost:8000/comments/' + comment._id, {
            method: 'DELETE'
        })
    };

    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <Avatar alt="" src="/static/images/avatar/2.jpg" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment._id}</div>
                    <div>{comment.createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.content}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.content}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">

                    <div
                        className="comment-action"
                        onClick={() =>
                            setActiveComment({ id: comment._id, type: "replying" })
                        }
                    >
                        Reply
                    </div>


                    <div
                        className="comment-action"
                        onClick={() =>
                            setActiveComment({ id: comment._id, type: "editing" })
                        }
                    >
                        Edit
                    </div>


                    <div
                        className="comment-action"
                        onClick={() => deleteComment(comment.id)}
                    >
                        Delete
                    </div>

                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => createComment(text, replyId)} />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map(reply => (<Comment comment={reply}
                            key={reply.id}
                            setActiveComment={setActiveComment}
                            activeComment={activeComment}
                            updateComment={updateComment}
                            parentId={comment.id}
                            replies={[]}
                            currentUserId={currentUserId} />))}
                    </div>
                )}
            </div>
        </div>
    );

}

export default Comment;