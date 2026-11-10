import 'server-only';
import mongoose from 'mongoose';
import type { PlainPost } from './data';
let connection: Promise<mongoose.Connection> | undefined;
export function hasPomexSource() { return Boolean(process.env.POMEX_BLOG_MONGODB_URI); }
export async function getPomexPosts(): Promise<PlainPost[]> {
  const uri = process.env.POMEX_BLOG_MONGODB_URI;
  if (!uri) return [];
  connection ??= mongoose.createConnection(uri, { dbName: 'pomexlux', autoIndex: false, serverSelectionTimeoutMS: 5000 }).asPromise().catch(error => { connection = undefined; throw error; });
  const db = await connection;
  const docs = await db.collection('blogs').find({ lang: 'fa', $or: [{ 'publication.status': 'published' }, { publication: { $exists: false } }] }).sort({ date: -1 }).toArray();
  return docs.map(doc => ({
    ...doc, _id: String(doc._id), title: doc.title, slug: doc.slug, excerpt: doc.excerpt || '',
    content: Array.isArray(doc.content) ? doc.content.join('\n') : doc.content || '',
    coverImage: doc.imageUrl ? new URL(doc.imageUrl, 'https://pomexlux.com').href : undefined,
    tags: doc.tags || [], author: doc.author || 'تحریریه پومکس', published: true,
    createdAt: new Date(doc.date || doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt || doc.date || doc.createdAt).toISOString(),
    sourceUrl: `https://pomexlux.com/fa/blogs/${encodeURIComponent(doc.slug)}`,
  }));
}
