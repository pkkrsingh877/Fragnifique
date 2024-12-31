import perfumes2 from '../../assets/banner/perfumes2.jpg';
// import { useUserContext } from '../../context/UserContext';

export default function Home() {
    // const { loggedInUser } = useUserContext();

    return (
        <div>
            <img src={perfumes2} />
            {/* {loggedInUser ? loggedInUser.name : 'Guest'} */}
        </div>
    )
}
