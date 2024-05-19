import styles from "./page.module.css";
import Post from './components/post';
import prisma from '@/lib/prisma';
import Link from 'next/link'; // Import the Link component

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true }
        }
      }
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <Link href="/add-post">Add Post</Link> {/* Use the Link component properly */}
      <h1>Feed</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          authorName={post.author.name}
        />
      ))}
    </main>
  );
}
