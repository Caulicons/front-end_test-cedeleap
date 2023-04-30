import IPost from '../../../interface/Post';
import Title from '../../Typography/Title';
import { ReactComponent as EditIcon } from '../../../assets/editIcon.svg';
import { ReactComponent as TrashIcon } from '../../../assets/trashIcon.svg';
import Text from '../../Typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostPopUp, editPostPopUp } from '../../../redux/Slices/selectedPostToEdit';
import { RootState } from '../../../redux/store';
import { postSelected } from '../../../redux/Slices/posts';

function Post(postData: IPost) {

   const dispatch = useDispatch();
   const userName = useSelector((state: RootState) => state.user.username);
   const formattingDate = (postDate: string): string => {
      const currentTime = Date.now();
      const postTime = new Date(postDate).getTime();
      const timeDiffInSeconds = Math.floor((currentTime - postTime) / 1000);

      const secondsInMinute = 60;
      const secondsInHour = 3600;
      const secondsInDay = 86400;

      if (timeDiffInSeconds < (secondsInMinute / 2)) {
         return 'posted now';
      } else if (timeDiffInSeconds < secondsInMinute) {
         return `${timeDiffInSeconds} seconds ago`;
      } else if (timeDiffInSeconds >= secondsInMinute && timeDiffInSeconds < secondsInHour) {
         const timeDiffInMinutes = Math.floor(timeDiffInSeconds / secondsInMinute);
         return `${timeDiffInMinutes} minutes ago`;
      } else if (timeDiffInSeconds >= secondsInHour && timeDiffInSeconds < secondsInDay) {
         const timeDiffInHours = Math.floor(timeDiffInSeconds / secondsInHour);
         return `${timeDiffInHours} hours ago`;
      } else {
         return `Posted on ${new Date(postDate).toLocaleDateString('en-GB')}`;
      };
   };

   const deletePost = () => {
      dispatch(deletePostPopUp());
      dispatch(postSelected(postData));
   };

   const editPost = () => {
      dispatch(editPostPopUp());
      dispatch(postSelected(postData));
   };

   return <div
      className="
         h-auto min-w-fit max-w-[752px] 
      "
      id='post'
   >
      <div className='
        flex justify-between p-default bg-blue text-white rounded-t-default
      '>
         <Title className='break-all' Tag='h3'>{postData.title}</Title>
         <div className='
         flex flex-wrap  w-[90px] break-words pocket:justify-end sm:justify-between
         '>
            {postData.username === userName ?
               <>
                  <TrashIcon
                     onClick={deletePost}
                     className='p-1 hover:fill-red' fill='blue' width={40} height={40} cursor='pointer' />
                  <EditIcon
                     onClick={editPost}
                     className='p-1 hover:fill-green' width={40} height={40} cursor='pointer' />
               </>
               :
               <></>
            }
         </div>
      </div>
      <div className='flex flex-col gap-[16px] p-default 
      border rounded-b-small border-solid border-borderColor
      '>
         <div className='flex justify-between text-gray'>
            <Text className='font-bold'>{postData.username}</Text>
            <Text>{formattingDate(postData.created_datetime)}</Text>
         </div>
         <Text className='break-words leading-[21px] text-[18px]'>
            {postData.content}
         </Text>
      </div>
   </div>;
}

export default Post;