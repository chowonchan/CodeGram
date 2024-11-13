import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';  // axios 임포트
import '../css/feed.css';  // CSS 파일 임포트

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);  // 게시물 상태
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const [page, setPage] = useState(1);  // 페이지 상태
  const observer = useRef(null);  // IntersectionObserver를 위한 ref

  // 서버에서 데이터를 비동기적으로 가져오는 함수
  const fetchPosts = async (page) => {
    setLoading(true);

    try {
      // 서버 API 요청 (DB에서 데이터를 받아오는 부분)
      const response = await axios.get(`/api/posts?page=${page}`); 
      // 서버 API 요청 (서버 URL 및 쿼리 파라미터 수정 필요)
      
      // 받아온 데이터가 있을 경우, 상태 업데이트
      if (response.data) {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
    } catch (error) {
      console.error('게시물 데이터를 가져오는 데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지가 변경될 때마다 게시물 로딩
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // 마지막 게시물 감지 및 무한스크롤 트리거
  const lastPostRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    });

    if (node) observer.current.observe(node);  // 마지막 게시물 감지
  };

  return (
    <div className="feed-margin">
      <div className="feed">
        {posts.map((post, index) => (
          <article key={post.id} className="board-article">
            <div className="post">
              <div className="post-header">
                <div className="profile-margin">
                  <div className="user-profile">
                    <div className="pointer">
                      <div className="user-profile-img">
                        <a href={`/${post.author}`}>
                          <img src={post.profilePic} alt={post.author} className="radius" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="board-n-a">
                  <span>{post.author}</span>
                </div>
                <div className="more-options">...</div>
              </div>
              <div className="post-image">
                <img src={post.image} alt={post.caption} />
              </div>
              <div className="important-box">
                <section className="section-1">
                  <div className="box-1">
                    <span className="margin-1"><div>H</div></span>
                    <span className="margin-1"><div>C</div></span>
                  </div>
                  <div className="box-2">
                    <div className="item">K</div>
                  </div>
                </section>
                <div>{`좋아요 ${post.likes}개`}</div>
                <div className="post-caption">
                  <span>{post.author}</span> {post.caption}
                  <span className="detailBtn">더보기...</span>
                </div>
                <div className="coment-box">댓글 달기...</div>
              </div>
            </div>
          </article>
        ))}
        {loading && <p>Loading...</p>}
        {/* 마지막 게시물을 감지하는 ref */}
        <div ref={lastPostRef} />
      </div>
    </div>
  );
};

export default InfiniteScroll;
