import { useEffect, useState } from 'react';
import { BiUserVoice } from 'react-icons/bi';
import Skeleton from '../../common/Skeleton';
import { GROUPS } from '../../constants/dummy';
import Async from '../../containers/Async';
import GroupsContainer from '../../containers/Groups';

function DiscoverGroups() {
  const [state, setState] = useState({
    loading: true,
    fulfilled: false,
    error: null,
  });

  const onSearchFormSubmit = (values: { query: string }) => {
    console.log(values);
  };

  useEffect(() => {
    const TimerId = setTimeout(() => {
      setState({
        loading: false,
        fulfilled: true,
        error: null,
      });
    }, 2000);

    return () => {
      clearTimeout(TimerId);
    };
  }, []);

  return (
    <Async {...state} skeleton={<Skeleton.post repeat={6} />}>
      {GROUPS && (
        <GroupsContainer
          onSearchFormSubmit={onSearchFormSubmit}
          title='Your Groups'
          groups={GROUPS}
          icon={BiUserVoice}
        />
      )}
    </Async>
  );
}

export default DiscoverGroups;
