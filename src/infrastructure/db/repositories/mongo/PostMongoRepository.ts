import { Post } from "@domain/entities/Post";
import { IPostWithAuthor } from "@dto/post/IPostWithAuthor";
import { commentModel } from "@infrastructure/db/model/mongo/comments.model";
import { postModel } from "@infrastructure/db/model/mongo/post.model";
import { UserModel } from "@infrastructure/db/model/mongo/user.model";
import { IPostRepository } from "@ports/IPostRepository";
import { CommentMongoRepository } from "./CommentMongoRepository";

export class PostMongoRepository implements IPostRepository {
  async findById(id: string): Promise<Post | null> {
    const post = await postModel.findById(id);
    if (!post) {
      return null;
    }
    return post;
  }

  async findByIdWithAuthor(id: string): Promise<IPostWithAuthor | null> {
    const post = await this.findById(id);
    console.log(post,id)
    if (!post) {
      return null;
    }
    const [user, comments] = await Promise.all([
      await UserModel.findById(post.authorId),
      await new CommentMongoRepository().findByPostId(post.id),
    ]);
    if (!user || !comments) {
      return null;
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: { id: user.id, name: user.name },
      comments,
    };
  }

  async findByTitle(title: string): Promise<Post | null> {
    const post = await postModel.findOne({ title });
    if (!post) {
      return null;
    }
    return post;
  }

  async list(params: {
    limit: number;
    page: number;
  }): Promise<IPostWithAuthor[]> {
    const { limit, page } = params;
    const skip = (page - 1) * limit;
    console.log(skip,limit,params)
    const posts = await postModel.find().skip(skip).limit(limit).lean();

    const commentRepo = new CommentMongoRepository();

    const results = await Promise.all(
      posts.map(async (post) => {
        const [user, comments] = await Promise.all([
          UserModel.findById(post.authorId).lean(),
          commentRepo.findByPostId(post._id.toString()),
        ]);

        if (!user) return null;

        return {
          id: post._id.toString(),
          title: post.title,
          content: post.content,
          author: {
            id: user._id.toString(),
            name: user.name,
          },
          comments,
        } as IPostWithAuthor;
      }),
    );

    return results.filter((p): p is IPostWithAuthor => p !== null);
  }

  async delete(id: string): Promise<void> {
    await Promise.all([
      postModel.findByIdAndDelete(id),
      commentModel.deleteMany({ post_id: id }),
    ]);
  }

  async create(post: Post): Promise<Post | null> {
    const created = await postModel.create({
      _id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
    });
    console.log(created,'d')
    if (!created) return null;

    return new Post(
      created._id.toString(),
      created.title,
      created.content,
      created.authorId,
    );
  }
}
