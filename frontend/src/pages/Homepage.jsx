// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); 
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">Leet</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;



























import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { motion, AnimatePresence } from 'framer-motion';

// Only use DaisyUI default themes here
const DAISY_THEMES = ['light', 'dark'];

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });


  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };
    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };


  const easyAll = problems.filter(p => p.difficulty === 'easy').length;
  const mediumAll = problems.filter(p => p.difficulty === 'medium').length;
  const hardAll = problems.filter(p => p.difficulty === 'hard').length;
  const easyDone = solvedProblems.filter(p => p.difficulty === 'easy').length;
  const mediumDone = solvedProblems.filter(p => p.difficulty === 'medium').length;
  const hardDone = solvedProblems.filter(p => p.difficulty === 'hard').length;
  const totalSolved = solvedProblems.length;


  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const isSolved = solvedProblems.some(sp => sp._id === problem._id);
    const statusMatch = filters.status === 'all' || (filters.status === 'solved' && isSolved);
    return difficultyMatch && tagMatch && statusMatch;
  });


  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${(custom.value / (custom.max || 1)) * 100}%`,
      transition: { duration: 0.8, ease: 'easeOut' },
    }),
  };

  const cardVariant = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
  const listAnim = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } };


  const handleSheet = () => alert('Sheet action...');

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navbar */}
      <motion.nav
        className="navbar backdrop-blur-sm bg-base-100/90 shadow-lg sticky top-0 z-40 border-b border-base-300"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, type: 'spring' }}
      >
        {/* Brand */}
        <section className="flex-1 flex items-center gap-3 md:gap-5">
          <span className="text-3xl md:text-4xl font-black text-primary transition-all duration-200">💡</span>
          <NavLink
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary hover:scale-105 hover:text-secondary transition-all duration-200"
            style={{ letterSpacing: '0.07em' }}
          >
            Leet
          </NavLink>
        </section>

        {/* Right side controls */}
        <section className="flex-none flex items-center gap-2 md:gap-4">
          <button
            className="btn btn-primary btn-sm rounded-full shadow-md hover:scale-105 transition-transform"
            onClick={handleSheet}
            aria-label="Open Sheet"
          >
            <span className="mr-1">📄</span> Sheet
          </button>

          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="select select-bordered select-sm max-w-xs shadow-sm focus:outline-none border-base-300"
            style={{ minWidth: 90 }}
            aria-label="Select theme"
          >
            {DAISY_THEMES.map(t => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar placeholder hover:scale-110 transition-transform"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="bg-accent text-accent-content rounded-full w-9 h-9 flex justify-center items-center uppercase border-2 border-primary font-bold text-lg transition-all duration-200 ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.firstName[0]}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-3 shadow-xl menu menu-sm dropdown-content bg-base-100/90 rounded-box w-44"
                aria-label="User menu"
              >
                <li>
                  <div className="px-2 py-1 text-lg font-semibold cursor-default pointer-events-none text-primary">
                    {user.firstName}
                  </div>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <NavLink to="/admin" className="hover:bg-base-200 rounded-md">
                      Admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="hover:bg-base-200 rounded-md">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-outline btn-sm rounded-full shadow-sm hover:scale-105 transition-transform"
            >
              Login
            </NavLink>
          )}
        </section>
      </motion.nav>










      <motion.section
        className="container mx-auto px-4 py-8 flex flex-wrap gap-10 justify-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        aria-label="Dashboard: solved problems and progress"
      >
        {/* Solved Stats Card */}
        <motion.div
          variants={cardVariant}
          className="card bg-base-100 shadow-xl rounded-lg border-l-8 border-primary flex items-center gap-6 px-6 py-5 w-full max-w-xs cursor-default select-none"
          role="region"
          aria-label="Total problems solved"
          whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.12)' }}
        >
          <div className="avatar placeholder">
            <div className="bg-primary text-base-100 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-extrabold leading-none select-none text-center">
              <span className=''>{totalSolved}</span>
            </div>
          </div>

          <div>
            <div className="font-semibold text-xl tracking-wide">Problems Solved</div>
            <div className="text-base text-base-content/70 mt-1">
              {totalSolved} / {problems.length} total
            </div>
          </div>
        </motion.div>

        {/* Progress By Difficulty Card */}
        <motion.div
          variants={cardVariant}
          className="card bg-base-100 shadow-xl rounded-lg px-8 py-6 flex-1 min-w-[280px] max-w-2xl"
          role="region"
          aria-label="Progress by problem difficulty"
        >
          <h3 className="font-bold text-lg mb-4 tracking-wide">Progress by Difficulty</h3>

          {/* Easy */}
          <div className="flex items-center gap-4 mb-4">
            <span className="badge badge-success text-sm min-w-[65px]">Easy</span>
            <div className="relative flex-1 h-4 bg-base-300 rounded-full overflow-hidden">
              <motion.div
                className="bg-success h-4 rounded-full"
                custom={{ value: easyDone, max: easyAll }}
                initial="hidden"
                animate="visible"
                variants={progressBarVariants}
              />
            </div>
            <span className="text-xs text-base-content/70 min-w-[40px] text-right tabular-nums">
              {easyDone} / {easyAll || 1}
            </span>
          </div>

          {/* Medium */}
          <div className="flex items-center gap-4 mb-4">
            <span className="badge badge-warning text-sm min-w-[65px]">Medium</span>
            <div className="relative flex-1 h-4 bg-base-300 rounded-full overflow-hidden">
              <motion.div
                className="bg-warning h-4 rounded-full"
                custom={{ value: mediumDone, max: mediumAll }}
                initial="hidden"
                animate="visible"
                variants={progressBarVariants}
              />
            </div>
            <span className="text-xs text-base-content/70 min-w-[40px] text-right tabular-nums">
              {mediumDone} / {mediumAll || 1}
            </span>
          </div>

          {/* Hard */}
          <div className="flex items-center gap-4">
            <span className="badge badge-error text-sm min-w-[65px]">Hard</span>
            <div className="relative flex-1 h-4 bg-base-300 rounded-full overflow-hidden">
              <motion.div
                className="bg-error h-4 rounded-full"
                custom={{ value: hardDone, max: hardAll }}
                initial="hidden"
                animate="visible"
                variants={progressBarVariants}
              />
            </div>
            <span className="text-xs text-base-content/70 min-w-[40px] text-right tabular-nums">
              {hardDone} / {hardAll || 1}
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* Filters */}
      <motion.section
        variants={cardVariant}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 flex flex-wrap gap-5 mb-12 justify-center items-center"
        role="region"
        aria-label="Problem filters"
      >
        {[
          {
            label: 'Status',
            value: filters.status,
            onChange: v => setFilters({ ...filters, status: v }),
            options: [
              { value: 'all', label: 'All Problems' },
              { value: 'solved', label: 'Solved Problems' },
            ],
          },
          {
            label: 'Difficulty',
            value: filters.difficulty,
            onChange: v => setFilters({ ...filters, difficulty: v }),
            options: [
              { value: 'all', label: 'All Difficulties' },
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ],
          },
          {
            label: 'Tag',
            value: filters.tag,
            onChange: v => setFilters({ ...filters, tag: v }),
            options: [
              { value: 'all', label: 'All Tags' },
              { value: 'array', label: 'Array' },
              { value: 'linkedList', label: 'Linked List' },
              { value: 'graph', label: 'Graph' },
              { value: 'dp', label: 'DP' },
            ],
          },
        ].map(({ label, value, onChange, options }) => (
          <label key={label} className="form-control w-auto">
            <span className="label-text font-semibold text-xs mb-1 block">{label}</span>
            <select
              className="select select-bordered select-sm rounded-lg min-w-[130px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-60"
              value={value}
              onChange={e => onChange(e.target.value)}
              aria-label={`Filter by ${label}`}
            >
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </motion.section>







      {/* Problems List */}
      <motion.div
        className="container mx-auto px-4 mb-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        aria-live="polite"
      >
        <AnimatePresence>
          {filteredProblems.map(problem => (
            <motion.div
              key={problem._id}
              variants={listAnim}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.15)' }}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ duration: 0.18, type: 'spring' }}
              className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-colors"
              role="article"
              tabIndex={0}
              aria-label={`Problem: ${problem.title}`}
            >
              <div className="card-body space-y-3">
                <div className="flex justify-between items-center">
                  <NavLink
                    to={`/problem/${problem._id}`}
                    className="card-title text-base md:text-lg hover:text-primary transition-colors"
                  >
                    {problem.title}
                  </NavLink>
                  {solvedProblems.some(sp => sp._id === problem._id) && (
                    <span className="badge badge-success gap-1 animate-pulse" aria-label="Solved">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>{' '}
                      Solved
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className={`badge ${getDifficultyBadgeColor(problem.difficulty)} capitalize`}>
                    {problem.difficulty}
                  </span>
                  <span className="badge badge-info">{problem.tags}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}







// Helper for difficulty badge colors
function getDifficultyBadgeColor(difficulty) {
  switch ((difficulty || '').toLowerCase()) {
    case 'easy':
      return 'badge-success';
    case 'medium':
      return 'badge-warning';
    case 'hard':
      return 'badge-error';
    default:
      return 'badge-neutral';
  }
}

// ProgressBar component
function ProgressBar({ label, value, max, color }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className={`badge badge-${color} text-xs min-w-[58px]`}>{label}</span>
      <progress className={`progress progress-${color} w-44`} value={value} max={max}></progress>
      <span className="text-xs">
        {value}/{max}
      </span>
    </div>
  );
}

// Filter dropdown component
function Filter({ label, value, onChange, options }) {
  return (
    <label className="form-control w-auto">
      <div className="label">
        <span className="label-text font-semibold text-xs">{label}</span>
      </div>
      <select
        className="select select-bordered select-sm min-w-[115px]"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={`Filter by ${label}`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Homepage;
