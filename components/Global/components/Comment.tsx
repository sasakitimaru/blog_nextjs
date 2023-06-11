import React, { useState, useRef, useEffect } from 'react'
import styles from '../Layout.module.scss'
import axios from 'axios';

interface Comment {
    pageId: string;
    userId?: string;
    text: string;
    date: string;
}

interface CommentList {
    _id: string;
    comment: Comment;
}

const Comment = ({ pageId }: { pageId?: string }) => {
    const [comment, setComment] = useState<Comment>({ pageId, text: '', date: '' });
    const [commentList, setCommentList] = useState<Array<CommentList>>([]);
    const [isCommentPosted, setIsCommentPosted] = useState<boolean>(false); 
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const handlePostComment = async () => {
        if (comment.text.length < 10) {
            alert('コメントは10文字以上で入力してください');
            return;
        }
        await axios.post(`/api/mongoDB`, { comment }, { headers: { 'Content-Type': 'application/json' } });
        setComment({ pageId: pageId, text: '', date: '' });
        inputRef.current.value = '';
        setIsCommentPosted(!isCommentPosted);
    };
    useEffect(() => {
        const handleGetComment = async () => {
            const res = await axios.get(`/api/mongoDB?pageId=${pageId}`);
            console.log(res.data);
            setCommentList(res.data.comments);
        };
        handleGetComment();
    }, [isCommentPosted]);


    return (
        <div className={styles['layout-container']}>
            <div className={styles['search-container']}>
                <h2 className={styles['search-title']}>コメント</h2>
            </div>
            <div className={styles['layout-commentlist']}>
                {commentList.map((commentInfo, index) => (
                    <div key={index} className={styles['layout-comment']}>
                        <div className={styles['layout-text']}>
                            {commentInfo.comment.text}
                        </div>
                        <div className={styles['layout-date']}>
                            {commentInfo.comment.date}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles['layout-inputcontainer']}>
                <textarea
                    className={styles['layout-input']}
                    minLength={10}
                    maxLength={400}
                    rows={5}
                    name="comment"
                    cols={30}
                    form="usrform"
                    placeholder="Comment here..."
                    onChange={(e) => setComment({ pageId, text: e.target.value, date: new Date().toLocaleString() })}
                    ref={inputRef}
                />
                <button
                    className={styles['layout-button']}
                    onClick={handlePostComment}
                >
                    投稿
                </button>
            </div>
        </div>
    )
}

export default Comment