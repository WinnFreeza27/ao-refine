import { httpErrors } from "./storage";
import propTypes from "prop-types";

function ErrorStatus({status}) {
    const {title} = httpErrors[status]
    const currentTimestamp = new Date().toLocaleString();
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <div className="max-w-[95%] sm:max-w-md mx-auto mt-10 p-6 border bg-bg-transparent border-bd-grey rounded-lg text-center font-poppins">
        <div className="text-2xl mb-4 text-red-600">Application Error</div>
        <div className="text-base mb-4 text-white">
          We apologize for the inconvenience, but our application is currently experiencing technical difficulties. This issue is due to a problem on our server.
        </div>
        <div className="text-sm mb-2 text-salmonize">
          <div><strong>Error Code:</strong> {status} ({title})</div>
          <div><strong>Timestamp:</strong> {currentTimestamp}</div>
        </div>
        <div className="text-base mb-4 text-white">
          Please try refreshing the page. If the problem persists, you may want to check back later.
        </div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleRefresh}
        >
          Refresh Page
        </button>
        <div className="text-sm mt-6 text-slate-400">
          If you need immediate assistance or have any questions, please contact our support team:
          <div>Email: <span className="font-bold">zyzaomathsupport@gmail.com</span></div>
          <div>Discord: <span className="font-bold">sherlockbot</span></div>
        </div>
      </div>
    )
}

ErrorStatus.propTypes  = {
  status: propTypes.number.isRequired
}

export default ErrorStatus