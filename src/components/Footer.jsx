const Footer = () => {
  return (
    <div className=" bg-black text-white py-10 px-16 md:px-40">
      <h3>weather.check</h3>
      <div className="flex flex-wrap md:gap-14 gap-7 py-10 justify-center">
        <div className="max-w-[200px] text-gray-500">
          <h2 className="font-medium text-lg">About</h2>
          <p className="text-sm font-light">
            weather.check is a simple weather checking site that use reliable third party APIs to fetch weather info of a specific city.
          </p>
        </div>
        <div className="max-w-[200px] text-gray-500">
          <h2 className="font-medium text-lg">Contact</h2>
          <p className="text-sm font-light">
            Reach me out at Linkdin:
            <br />
            <a target="_blank" href="http://linkedin.com/in/nabeel-dev" className="text-yellow-300 opacity-40 font-extralight hover:opacity-80">
              linkedin.com/in/nabeel-dev
            </a>
            <br />
            or Github:
            <a target="_blank" href="http://github.com/nabeel-mustafa-git" className="text-yellow-300 opacity-40 font-extralight hover:opacity-80">
              <br />
              github.com/nabeel-mustafa-git
            </a>
          </p>
        </div>
        <div className="max-w-[200px] text-gray-500">
          <h2 className="font-medium text-lg">Having Problem?</h2>
          <p className="text-sm font-light">
            Plz messege me on Linkdin in case if you are facing any problem in the site!
            <br />
            <a target="_blank" href="http://linkedin.com/in/nabeel-dev" className="text-yellow-300 opacity-40 font-extralight hover:opacity-80">
              linkedin.com/in/nabeel-dev
            </a>
          </p>
        </div>
      </div>
      <p className="flex justify-center text-gray-700 font-medium text-sm">weather.check &reg; 2024 | All rights Reserved</p>
    </div>
  );
};

export default Footer;
