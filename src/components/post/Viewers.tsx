import GalleryViewer from '../../common/Gallery';
import Group from '../../common/Group';
import Member from '../../common/Member';
import Post from '../../common/Post';
import PlyrViewer from '../../common/plyr';
import EmbeddedViewer from './body/Embedded';
import PDF from './body/viewers/Pdf';

function Viewers(props: PostViewersProps) {
  const { post, full } = props;

  switch (post.variant) {
    case 'audio':
      return (
        <div className='shadow-nice'>
          <PlyrViewer src={post.assets?.audios?.[0]} MediaType='audio' />
        </div>
      );
    case 'video':
      return (
        <div className='shadow-nice'>
          <PlyrViewer src={post.assets?.videos?.[0]} MediaType='video' />
        </div>
      );
    case 'embedded':
      return <EmbeddedViewer src={post.assets?.embedded} />;
    case 'pdf':
      return <PDF src={post.assets?.pdf ?? ''} />;
    case 'gallery':
      return (
        <div className='post-thumbs'>
          <GalleryViewer
            galleryId={post.id}
            gallery={post.assets.gallery ?? []}
            full={full}
          />
        </div>
      );
    case 'cover':
      return (
        <div className='post-thumbs'>
          <GalleryViewer
            galleryId={post.id}
            gallery={[post.assets.cover ?? '']}
          />
        </div>
      );
    case 'avatar':
      return (
        <div className='post-thumbs'>
          <img
            src={post.assets.avatar}
            alt='user-avatar'
            className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] mx-auto block object-cover rounded-full'
          />
        </div>
      );
    case 'friend':
      return (
        <div className='flex justify-center'>
          <Member user={post.assets.friend} />
        </div>
      );
    case 'group':
      return <Group group={post.assets.group} />;
    case 'share':
      return (
        <Post
          className='pb-4 mb-[0!important]'
          isShared
          post={post.share.origin}
        />
      );

    default:
      return <div>{post.variant}</div>;
  }
}

export default Viewers;