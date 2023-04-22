import {
  Accordion,
  Avatar,
  Indicator,
  Menu,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ReactElement } from 'react';
import { CgOptions } from 'react-icons/cg';
import { FiExternalLink } from 'react-icons/fi';
import { IoSaveOutline } from 'react-icons/io5';
import { TbTextRecognition } from 'react-icons/tb';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useReactsContext } from '../context/Reacts';
import { POST_TYPES, REACT_ICONS, timeToX } from '../helpers';
import RoundedAvatar from './Avatar';
import Comments, { WriteComment } from './Comment';

/**
 * Post component
 * @usage

- use `className` to add classes to Post wrapper
- use `post` to pass post info

 * @returns {ReactElement}
 */
function Post(props: { post: Post; className?: string }): ReactElement {
  const { post } = props;
  const { setReacts } = useReactsContext();
  const clipboard = useClipboard();

  if (!post) {
    return <></>;
  }

  const Body = POST_TYPES[post.type].component;

  const onReactsClick = () => {
    setReacts(post.reacts.reacts);
  };

  const onCopyBtnClick = (value: string) => {
    clipboard.copy(value);

    notifications.show({
      title: 'Successfully copied',
      message: 'Hey there, your text has successfully copied!',
      loading: false,
      withCloseButton: true,
      color: '',
      autoClose: true,
    });
  };

  return (
    <div className={`post-card ${props.className}`}>
      <div className='post-header'>
        <div className='media'>
          <div className='activity-avatar'>
            <Link to={`/profile/${post.user.id}`}>
              <Indicator
                inline
                size={12}
                offset={7}
                position='bottom-end'
                color=''
                withBorder
              >
                <RoundedAvatar sm alt='avatar' src={post.user.avatar} />
              </Indicator>
            </Link>
            <div className='status-info ml-4'>
              <div className='activity-title'>
                <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
                <span className='block md:inline-block'>
                  {POST_TYPES[post.type].msg}
                </span>
              </div>
              <div className='activity-time'>{timeToX(post.publishAt)}</div>
            </div>
          </div>
        </div>
        <div className=''>
          <Menu shadow='md' width={180}>
            <Menu.Target>
              <UnstyledButton>
                <CgOptions />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => onCopyBtnClick(`/post/${post.id}`)}
                icon={<FiExternalLink className='text-lg' />}
              >
                Copy post URL
              </Menu.Item>
              {post.body && (
                <Menu.Item
                  onClick={() => onCopyBtnClick(post.body)}
                  icon={<TbTextRecognition className='text-lg' />}
                >
                  Copy post content
                </Menu.Item>
              )}
              {/* TODO: add save post API */}
              <Menu.Item icon={<IoSaveOutline className='text-lg' />}>
                Save post
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      <div className='post-body'>
        <div className='activity-inner'>
          <p className='widget-box-status-text'>{post.body}</p>
          <Body post={post} />
        </div>
        <Accordion>
          <Accordion.Item value='comment' className='border-0'>
            <div className='post-meta-wrap'>
              <div className='cursor-pointer' onClick={onReactsClick}>
                <Tooltip.Group openDelay={300} closeDelay={100}>
                  <Avatar.Group spacing='sm'>
                    {Object.keys(post.reacts.reacts).map((key) => {
                      const react = REACT_ICONS[key as ReactsLabel];
                      return (
                        <Tooltip label={key} key={key} withArrow>
                          <Avatar radius='xl' color={react.color}>
                            <react.icon />
                          </Avatar>
                        </Tooltip>
                      );
                    })}
                    <Avatar radius='xl'>{post.reacts.count}</Avatar>
                  </Avatar.Group>
                </Tooltip.Group>
              </div>
              <div className='post-meta activity-meta'>
                <Accordion.Control>
                  <div className='meta-text flex items-center'>
                    <VscCommentDiscussion className='text-lg mr-1' />
                    <span>{post.comments.length}</span>
                  </div>
                </Accordion.Control>
              </div>
            </div>
            <Accordion.Panel>
              <Comments comments={post.comments} />
              <WriteComment />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

Post.defaultProps = {
  post: null,
  className: '',
};

export default Post;
