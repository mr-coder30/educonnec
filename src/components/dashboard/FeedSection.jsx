import React, { useState, useEffect, useCallback, useRef } from 'react'

import PostCard from '../common/PostCard'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { mockPosts } from '../../data/mockData'

const FeedSection = ({ filters }) => {
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)

  const loadMorePosts = useCallback(() => {
    // Simulate API call
    setTimeout(() => {
      const currentPage = pageRef.current
      const newPosts = mockPosts.slice((currentPage - 1) * 5, currentPage * 5)
      if (newPosts.length === 0) {
        setHasMore(false)
        return
      }
      setPosts(prev => [...prev, ...newPosts])
      pageRef.current = currentPage + 1
    }, 1000)
  }, [])

  const { lastElementRef } = useInfiniteScroll(loadMorePosts, hasMore)

  useEffect(() => {
    // Reset posts when filters change
    setPosts([])
    pageRef.current = 1
    setHasMore(true)
    loadMorePosts()
  }, [filters, loadMorePosts])

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastElementRef : null}
        >
          <PostCard post={post} />
        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  )
}

export default FeedSection