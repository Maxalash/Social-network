from django.db import models

class Post(models.Model):
    title = models.TextField()
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    embedded_likes_count = models.IntegerField(default=0)

    @property
    def bookmark_count(self):
        return self.bookmark_set.all().count()

    @property
    def likes_count(self):
        return self.postlike_set.all().count()

class PostImage(models.Model):
    image = models.ImageField(max_length=100, upload_to='post/media/images')
    owner = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING, default=None)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)

class Comment(models.Model):
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name='post_comments')
    embedded_likes_count = models.IntegerField(default=0)

    @property
    def likes_count(self):
        return self.commentlike_set.all().count()

class PostLike(models.Model):
    posts = models.ForeignKey('Post', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.posts.embedded_likes_count += 1
            self.posts.save()

        super().save(*args,**kwargs)

    def delete(self, *args, **kwargs):
        self.posts.embedded_likes_count -= 1
        self.posts.save()

        super().delete(*args,**kwargs)

class CommentLike(models.Model):
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.comment.embedded_likes_count += 1
            self.comment.save()

        super().save(*args,**kwargs)

    def delete(self, *args, **kwargs):
        self.comment.embedded_likes_count -= 1
        self.comment.save()

        super().delete(*args,**kwargs)


class Bookmark(models.Model):
    bookmarked = models.DateTimeField(auto_now_add=True,)
    owner = models.ForeignKey('auth.User',on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name='bookmark_set')

class PostVideo(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    video = models.FileField(max_length=254,upload_to='post/media/videos')

class PostAudio(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    audio = models.FileField(max_length=254,upload_to='post/media/audios')

