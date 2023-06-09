import Title from '../Typography/Title';
import PostForm from '../PostForm';

function CreatePoster() {
   return (
      <section
         className="
         rounded-small border border-solid border-borderColor
         p-default
      "
      >
         <Title Tag="h3" className="mb-6">
            What’s on your mind?
         </Title>
         <PostForm whatToDO="create" />
      </section>
   );
}

export default CreatePoster;
