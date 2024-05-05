import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button.tsx';

const Landing = () => {
  const navigate = useNavigate();
  function play() {
    navigate('game');
  }
  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-evenly">
          <div className="flex justify-center ">
            <img
              src="../../board.png"
              className="max-w-72 md:max-w-96 xl:max-w-xl"
            />
          </div>
          <div className="flex-col justify-center pl-10">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">
                Play Chess Online on the #1 site
              </h1>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={play}>Play Online</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
