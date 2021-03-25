import React from 'react';
import { Card, Avatar } from 'antd';
import styles from './Posts.module.css'
import { HeartTwoTone, CommentOutlined, DislikeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import {useEffect,useState} from "react";
import db from "../../config/firebaseConfig";
const { Meta } = Card;

function Post(props) {
    const { post } = props;
    const [author,setAuthor]=useState(null);

    const router = useRouter()
    useEffect(()=>{
        const userRef=db.collection("users").doc(post.userid).onSnapshot(snap=>{
            setAuthor(snap.data());

        })
    },[])


    return (

        <Card className={styles.card}
            cover={<img alt="example"
                height={180} src={post.url} />}
            actions={[
                <div><HeartTwoTone twoToneColor="#eb2f96" />
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post.like}</span></div>,
                <div><DislikeOutlined key="dislike" />
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post.dislike}</span></div>,
                <CommentOutlined key="comment" />

            ]}
        >

            <Meta title={post.title}
                avatar={<Avatar src={author?.photoURL} />}
                description={<div className={styles.card_content}>{post.content}</div>} className={styles.card_body}
                onClick={() => router.push({
                    pathname: '/Article',
                    query: { id: post.id },
                })} />

        </Card>
    );
}

export default Post;