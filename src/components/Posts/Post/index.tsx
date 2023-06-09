import IPost from '../../../interface/Post';
import Title from '../../Typography/Title';
import { ReactComponent as EditIcon } from '../../../assets/editIcon.svg';
import { ReactComponent as TrashIcon } from '../../../assets/trashIcon.svg';
import Text from '../../Typography/Text';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import usePostOptionsPopUp from '../../../actions/hooks/handlePostOptionsPopUp';

function Post(postData: IPost) {
   const editPostPopUp = usePostOptionsPopUp('editPost');
   const deletePostPopUp = usePostOptionsPopUp('deletePost');
   const userNameLogged = useSelector(
      (state: RootState) => state.user.username
   );

   const formattingDate = (postDate: string): string => {
      const currentTime = Date.now();
      const postTime = new Date(postDate).getTime();
      const timeDiffInSeconds = Math.floor((currentTime - postTime) / 1000);

      const secondsInMinute = 60;
      const secondsInHour = 3600;
      const secondsInDay = 86400;

      if (timeDiffInSeconds < secondsInMinute / 2) {
         return 'posted now';
      } else if (timeDiffInSeconds < secondsInMinute) {
         return `${timeDiffInSeconds} seconds ago`;
      } else if (
         timeDiffInSeconds >= secondsInMinute &&
         timeDiffInSeconds < secondsInHour
      ) {
         const timeDiffInMinutes = Math.floor(
            timeDiffInSeconds / secondsInMinute
         );
         return `${timeDiffInMinutes} minutes ago`;
      } else if (
         timeDiffInSeconds >= secondsInHour &&
         timeDiffInSeconds < secondsInDay
      ) {
         const timeDiffInHours = Math.floor(timeDiffInSeconds / secondsInHour);
         return `${timeDiffInHours} hours ago`;
      } else {
         return `Posted on ${new Date(postDate).toLocaleDateString('en-GB')}`;
      }
   };

   return (
      <article
         className="
         h-auto min-w-fit max-w-[752px]
      "
         id="post"
      >
         <div
            className="
            flex justify-between rounded-t-default bg-blue p-default text-white
         "
         >
            <Title className="break-all" Tag="h3">
               {postData.title}
            </Title>
            <div
               className="
         flex w-[90px]  flex-wrap break-words pocket:justify-end sm:justify-between
         "
            >
               {postData.username === userNameLogged ? (
                  <>
                     <TrashIcon
                        onClick={() => deletePostPopUp(postData)}
                        className="p-1 hover:fill-red"
                        fill="blue"
                        width={40}
                        height={40}
                        cursor="pointer"
                     />
                     <EditIcon
                        onClick={() => editPostPopUp(postData)}
                        className="p-1 hover:fill-green"
                        width={40}
                        height={40}
                        cursor="pointer"
                     />
                  </>
               ) : (
                  <></>
               )}
            </div>
         </div>
         <div
            className="flex flex-col gap-[16px] break-words rounded-b-small 
      border border-solid border-borderColor p-default
      "
         >
            <div className="flex justify-between text-gray">
               <Text className="font-bold">{postData.username}</Text>
               <Text>{formattingDate(postData.created_datetime)}</Text>
            </div>
            <Text
               className="break-anywhere break-words text-[18px]
            leading-[21px]
               "
            >
               {postData.content}
            </Text>
         </div>
      </article>
   );
}

export default Post;
