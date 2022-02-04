import Navbar from '../../components/Navbar';
import {sanityClient, urlFor} from '../../lib/sanity';

function Posts() {
  return <main>
      <Navbar />
  </main>;
}

export default Posts;

export const getStaticProps = async () => {

}