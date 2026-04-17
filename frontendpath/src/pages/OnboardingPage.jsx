// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import useAuthStore from "../store/useAuthStore"
// import { createAssessment } from "../api/assessment.api"
// import { generatePath } from "../api/path.api"

// // ================================
// // GOALS DATA
// // ================================
// const goals = [
//   {
//     id: "Full Stack Development",
//     label: "Full Stack Development",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//         <rect x="2" y="3" width="20" height="14" rx="2"
//           stroke="currentColor" strokeWidth="2" />
//         <path d="M8 21h8M12 17v4"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     id: "DSA & Competitive Programming",
//     label: "DSA & Competitive Programming",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//         <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     id: "Data Science",
//     label: "Data Science",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//         <path d="M18 20V10M12 20V4M6 20v-6"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     id: "Android Development",
//     label: "Android Development",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//         <rect x="5" y="2" width="14" height="20" rx="2"
//           stroke="currentColor" strokeWidth="2" />
//         <path d="M12 18h.01"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     id: "DevOps & Cloud",
//     label: "DevOps & Cloud",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//         <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     ),
//   },
// ]

// // ================================
// // HOURS OPTIONS
// // ================================
// const hoursOptions = [0.5, 1, 2, 3, 4, 5, 6]

// // ================================
// // STEP INDICATOR
// // ================================
// const StepIndicator = ({ currentStep, totalSteps }) => (
//   <div className="flex items-center gap-2">
//     {Array.from({ length: totalSteps }).map((_, i) => (
//       <div key={i} className="flex items-center gap-2">
//         <div className={`
//           w-8 h-8 rounded-full flex items-center justify-center
//           text-xs font-semibold transition-all duration-300
//           ${i + 1 === currentStep
//             ? "bg-blue-500 text-white"
//             : i + 1 < currentStep
//               ? "bg-blue-500/20 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400"
//               : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
//           }
//         `}>
//           {i + 1 < currentStep ? (
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//               <path d="M20 6L9 17l-5-5" stroke="currentColor"
//                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           ) : (
//             i + 1
//           )}
//         </div>
//         {i < totalSteps - 1 && (
//           <div className={`
//             w-12 h-0.5 rounded-full transition-all duration-300
//             ${i + 1 < currentStep
//               ? "bg-blue-500"
//               : "bg-zinc-200 dark:bg-zinc-700"
//             }
//           `} />
//         )}
//       </div>
//     ))}
//   </div>
// )

// // ================================
// // MAIN COMPONENT
// // ================================
// const OnboardingPage = () => {
//   const [step, setStep] = useState(1)
//   const [selectedGoal, setSelectedGoal] = useState("")
//   const [targetWeeks, setTargetWeeks] = useState(8)
//   const [hoursPerDay, setHoursPerDay] = useState(2)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const updateUser = useAuthStore((state) => state.updateUser)
//   const navigate = useNavigate()

//   // ================================
//   // STEP LABELS
//   // ================================
//   const stepLabels = [
//     "Choose Goal",
//     "Set Timeline",
//     "Generate Path",
//   ]

//   // ================================
//   // HANDLE GENERATE
//   // ================================
//   const handleGenerate = async () => {
//     setError("")
//     setIsLoading(true)

//     try {
//       // step 1 — create assessment
//       const assessmentData = await createAssessment({
//         goal: selectedGoal,
//         targetWeeks,
//         hoursPerDay,
//       })

//       const assessmentId = assessmentData.assessment._id

//       // step 2 — generate learning path
//       await generatePath(assessmentId)

//       // step 3 — mark onboarding complete
//       updateUser({ isOnboardingComplete: true })

//       // step 4 — go to home
//       navigate("/home")

//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Something went wrong. Please try again."
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="
//       min-h-screen
//       bg-white dark:bg-zinc-950
//       transition-colors duration-300
//       flex
//     ">

//       {/* ================================ */}
//       {/* LEFT SIDE — PHOTO               */}
//       {/* ================================ */}
//       <div className="
//         hidden lg:block
//         w-[45%] flex-shrink-0
//         relative overflow-hidden
//       ">
//         {/* 
//           REPLACE THIS URL WITH YOUR PHOTO:
//           src/assets/onboarding.jpg
//           or any unsplash URL
//         */}
//         <img
//           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
//           alt="Students learning together"
//           className="w-full h-full object-cover"
//         />

//         {/* overlay gradient */}
//         <div className="
//           absolute inset-0
//           bg-gradient-to-r
//           from-transparent
//           to-white/10 dark:to-zinc-950/20
//         "/>

//         {/* bottom overlay text */}
//         <div className="
//           absolute bottom-0 left-0 right-0
//           p-8
//           bg-gradient-to-t from-black/60 to-transparent
//         ">
//           <p className="text-white/90 text-lg font-semibold leading-snug">
//             "The best time to start learning
//             <br />was yesterday. The next best time is now."
//           </p>
//           <p className="text-white/50 text-sm mt-2">
//             — PathAI
//           </p>
//         </div>
//       </div>

//       {/* ================================ */}
//       {/* RIGHT SIDE — FORM               */}
//       {/* ================================ */}
//       <div className="
//         flex-1
//         flex flex-col
//         items-center justify-center
//         px-6 sm:px-12 py-12
//         overflow-y-auto
//       ">
//         <div className="w-full max-w-lg space-y-10">

//           {/* logo */}
//           <div className="flex items-center gap-2.5">
//             <div className="
//               w-8 h-8 rounded-lg bg-blue-500
//               flex items-center justify-center flex-shrink-0
//             ">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//                   stroke="white" strokeWidth="2.5"
//                   strokeLinecap="round" strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <span className="font-bold text-lg text-zinc-900 dark:text-white">
//               PathAI
//             </span>
//           </div>

//           {/* step indicator */}
//           <div className="space-y-3">
//             <StepIndicator currentStep={step} totalSteps={3} />
//             <p className="text-xs text-zinc-400 dark:text-zinc-500">
//               Step {step} of 3 — {stepLabels[step - 1]}
//             </p>
//           </div>

//           {/* ================================ */}
//           {/* STEP 1 — CHOOSE GOAL            */}
//           {/* ================================ */}
//           {step === 1 && (
//             <div className="space-y-8">
//               <div className="space-y-2">
//                 <h1 className="
//                   text-2xl sm:text-3xl font-bold
//                   text-zinc-900 dark:text-white
//                   leading-snug
//                 ">
//                   Let's make your
//                   <br />
//                   <span className="text-blue-500">
//                     learning personal
//                   </span>
//                 </h1>
//                 <p className="text-zinc-500 dark:text-zinc-400 text-sm">
//                   What do you want to learn? Pick a goal to get started.
//                 </p>
//               </div>

//               {/* goal cards */}
//               <div className="grid grid-cols-1 gap-3">
//                 {goals.map((goal) => (
//                   <button
//                     key={goal.id}
//                     onClick={() => setSelectedGoal(goal.id)}
//                     className={`
//                       w-full px-4 py-4
//                       rounded-xl
//                       border-2
//                       flex items-center gap-4
//                       text-left
//                       transition-all duration-200
//                       ${selectedGoal === goal.id
//                         ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-zinc-900 dark:text-white"
//                         : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
//                       }
//                     `}
//                   >
//                     {/* icon */}
//                     <div className={`
//                       w-10 h-10 rounded-lg flex-shrink-0
//                       flex items-center justify-center
//                       transition-colors duration-200
//                       ${selectedGoal === goal.id
//                         ? "bg-blue-500 text-white"
//                         : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
//                       }
//                     `}>
//                       {goal.icon}
//                     </div>

//                     <span className="font-medium text-sm">
//                       {goal.label}
//                     </span>

//                     {/* check indicator */}
//                     {selectedGoal === goal.id && (
//                       <div className="ml-auto">
//                         <div className="
//                           w-5 h-5 rounded-full
//                           bg-blue-500
//                           flex items-center justify-center
//                         ">
//                           <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
//                             <path d="M20 6L9 17l-5-5"
//                               stroke="white" strokeWidth="3"
//                               strokeLinecap="round" strokeLinejoin="round"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>

//               {/* next button */}
//               <button
//                 onClick={() => setStep(2)}
//                 disabled={!selectedGoal}
//                 className="
//                   w-full py-3.5
//                   rounded-xl
//                   bg-blue-500 hover:bg-blue-600
//                   disabled:bg-zinc-200 dark:disabled:bg-zinc-800
//                   disabled:text-zinc-400 dark:disabled:text-zinc-600
//                   disabled:cursor-not-allowed
//                   text-white font-medium text-sm
//                   transition-all duration-200
//                   flex items-center justify-center gap-2
//                 "
//               >
//                 Continue
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                   <path d="M5 12h14M12 5l7 7-7 7"
//                     stroke="currentColor" strokeWidth="2"
//                     strokeLinecap="round" strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//             </div>
//           )}

//           {/* ================================ */}
//           {/* STEP 2 — SET TIMELINE           */}
//           {/* ================================ */}
//           {step === 2 && (
//             <div className="space-y-8">
//               <div className="space-y-2">
//                 <h1 className="
//                   text-2xl sm:text-3xl font-bold
//                   text-zinc-900 dark:text-white
//                   leading-snug
//                 ">
//                   Set your
//                   <br />
//                   <span className="text-blue-500">timeline</span>
//                 </h1>
//                 <p className="text-zinc-500 dark:text-zinc-400 text-sm">
//                   How long do you have and how much time
//                   can you dedicate each day?
//                 </p>
//               </div>

//               {/* selected goal pill */}
//               <div className="
//                 inline-flex items-center gap-2
//                 px-3 py-1.5 rounded-full
//                 bg-blue-50 dark:bg-blue-500/10
//                 border border-blue-200 dark:border-blue-500/20
//                 text-blue-600 dark:text-blue-400
//                 text-xs font-medium
//               ">
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
//                   <path d="M20 6L9 17l-5-5" stroke="currentColor"
//                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 {selectedGoal}
//               </div>

//               {/* weeks slider */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <label className="
//                     text-sm font-medium
//                     text-zinc-700 dark:text-zinc-300
//                   ">
//                     Duration
//                   </label>
//                   <span className="
//                     px-3 py-1 rounded-lg
//                     bg-blue-50 dark:bg-blue-500/10
//                     text-blue-600 dark:text-blue-400
//                     text-sm font-semibold
//                   ">
//                     {targetWeeks} weeks
//                   </span>
//                 </div>

//                 <input
//                   type="range"
//                   min="1"
//                   max="24"
//                   value={targetWeeks}
//                   onChange={(e) => setTargetWeeks(Number(e.target.value))}
//                   className="
//                     w-full h-2 rounded-full
//                     accent-blue-500
//                     cursor-pointer
//                   "
//                 />

//                 <div className="flex justify-between text-xs text-zinc-400">
//                   <span>1 week</span>
//                   <span>12 weeks</span>
//                   <span>24 weeks</span>
//                 </div>
//               </div>

//               {/* hours per day */}
//               <div className="space-y-4">
//                 <label className="
//                   text-sm font-medium
//                   text-zinc-700 dark:text-zinc-300
//                   block
//                 ">
//                   Hours per day
//                 </label>

//                 <div className="grid grid-cols-4 gap-2">
//                   {hoursOptions.map((hour) => (
//                     <button
//                       key={hour}
//                       onClick={() => setHoursPerDay(hour)}
//                       className={`
//                         py-3 rounded-xl
//                         text-sm font-medium
//                         border-2
//                         transition-all duration-200
//                         ${hoursPerDay === hour
//                           ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
//                           : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
//                         }
//                       `}
//                     >
//                       {hour}h
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* summary card */}
//               <div className="
//                 p-4 rounded-xl
//                 bg-zinc-50 dark:bg-zinc-900
//                 border border-zinc-200 dark:border-zinc-800
//                 space-y-2
//               ">
//                 <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
//                   Your plan summary
//                 </p>
//                 <div className="grid grid-cols-3 gap-4">
//                   {[
//                     { label: "Goal", value: selectedGoal.split(" ")[0] },
//                     { label: "Duration", value: `${targetWeeks} weeks` },
//                     { label: "Daily", value: `${hoursPerDay} hrs` },
//                   ].map((item) => (
//                     <div key={item.label} className="text-center">
//                       <p className="
//                         text-base font-bold
//                         text-zinc-900 dark:text-white
//                       ">
//                         {item.value}
//                       </p>
//                       <p className="text-xs text-zinc-400">{item.label}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep(1)}
//                   className="
//                     flex-1 py-3.5
//                     rounded-xl
//                     bg-zinc-100 dark:bg-zinc-900
//                     border border-zinc-200 dark:border-zinc-800
//                     hover:bg-zinc-200 dark:hover:bg-zinc-800
//                     text-zinc-700 dark:text-zinc-300
//                     font-medium text-sm
//                     transition-all duration-200
//                   "
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={() => setStep(3)}
//                   className="
//                     flex-[2] py-3.5
//                     rounded-xl
//                     bg-blue-500 hover:bg-blue-600
//                     text-white font-medium text-sm
//                     transition-all duration-200
//                     flex items-center justify-center gap-2
//                   "
//                 >
//                   Continue
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M5 12h14M12 5l7 7-7 7"
//                       stroke="currentColor" strokeWidth="2"
//                       strokeLinecap="round" strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ================================ */}
//           {/* STEP 3 — CONFIRM & GENERATE     */}
//           {/* ================================ */}
//           {step === 3 && (
//             <div className="space-y-8">
//               <div className="space-y-2">
//                 <h1 className="
//                   text-2xl sm:text-3xl font-bold
//                   text-zinc-900 dark:text-white
//                   leading-snug
//                 ">
//                   Ready to generate
//                   <br />
//                   <span className="text-blue-500">
//                     your roadmap?
//                   </span>
//                 </h1>
//                 <p className="text-zinc-500 dark:text-zinc-400 text-sm">
//                   Review your choices below. Click generate
//                   and we'll create your personalized learning path.
//                 </p>
//               </div>

//               {/* confirmation card */}
//               <div className="
//                 rounded-2xl
//                 border border-zinc-200 dark:border-zinc-800
//                 overflow-hidden
//               ">
//                 {/* header */}
//                 <div className="
//                   px-5 py-4
//                   bg-blue-50 dark:bg-blue-500/10
//                   border-b border-zinc-200 dark:border-zinc-800
//                 ">
//                   <p className="
//                     text-sm font-semibold
//                     text-blue-600 dark:text-blue-400
//                   ">
//                     Your Learning Plan
//                   </p>
//                 </div>

//                 {/* details */}
//                 <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
//                   {[
//                     {
//                       label: "Goal",
//                       value: selectedGoal,
//                       icon: (
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                           <circle cx="12" cy="12" r="10"
//                             stroke="currentColor" strokeWidth="2" />
//                           <circle cx="12" cy="12" r="3"
//                             stroke="currentColor" strokeWidth="2" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "Duration",
//                       value: `${targetWeeks} weeks`,
//                       icon: (
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                           <rect x="3" y="4" width="18" height="18" rx="2"
//                             stroke="currentColor" strokeWidth="2" />
//                           <path d="M16 2v4M8 2v4M3 10h18"
//                             stroke="currentColor" strokeWidth="2"
//                             strokeLinecap="round" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "Daily Study",
//                       value: `${hoursPerDay} hour${hoursPerDay > 1 ? "s" : ""} per day`,
//                       icon: (
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                           <circle cx="12" cy="12" r="10"
//                             stroke="currentColor" strokeWidth="2" />
//                           <path d="M12 6v6l4 2"
//                             stroke="currentColor" strokeWidth="2"
//                             strokeLinecap="round" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "Total Hours",
//                       value: `~${targetWeeks * 7 * hoursPerDay} hours`,
//                       icon: (
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
//                             stroke="currentColor" strokeWidth="2"
//                             strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                       ),
//                     },
//                   ].map((item) => (
//                     <div key={item.label} className="
//                       flex items-center justify-between
//                       px-5 py-3.5
//                       bg-white dark:bg-zinc-900
//                     ">
//                       <div className="flex items-center gap-3">
//                         <span className="text-zinc-400 dark:text-zinc-500">
//                           {item.icon}
//                         </span>
//                         <span className="
//                           text-sm text-zinc-500 dark:text-zinc-400
//                         ">
//                           {item.label}
//                         </span>
//                       </div>
//                       <span className="
//                         text-sm font-semibold
//                         text-zinc-900 dark:text-white
//                       ">
//                         {item.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* error */}
//               {error && (
//                 <div className="
//                   p-3 rounded-lg
//                   bg-red-50 dark:bg-red-500/10
//                   border border-red-200 dark:border-red-500/20
//                   text-red-600 dark:text-red-400
//                   text-sm
//                 ">
//                   {error}
//                 </div>
//               )}

//               {/* ai notice */}
//               <div className="
//                 flex items-start gap-3
//                 p-4 rounded-xl
//                 bg-zinc-50 dark:bg-zinc-900
//                 border border-zinc-200 dark:border-zinc-800
//               ">
//                 <div className="
//                   w-8 h-8 rounded-lg
//                   bg-blue-500/10 dark:bg-blue-500/20
//                   flex items-center justify-center
//                   flex-shrink-0 mt-0.5
//                 ">
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                     <circle cx="12" cy="12" r="10"
//                       stroke="#3b82f6" strokeWidth="2" />
//                     <path d="M12 16v-4M12 8h.01"
//                       stroke="#3b82f6" strokeWidth="2"
//                       strokeLinecap="round" />
//                   </svg>
//                 </div>
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
//                   Groq AI will generate your personalized week-by-week
//                   roadmap with curated YouTube and documentation links.
//                   This usually takes 5-10 seconds.
//                 </p>
//               </div>

//               {/* buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep(2)}
//                   disabled={isLoading}
//                   className="
//                     flex-1 py-3.5
//                     rounded-xl
//                     bg-zinc-100 dark:bg-zinc-900
//                     border border-zinc-200 dark:border-zinc-800
//                     hover:bg-zinc-200 dark:hover:bg-zinc-800
//                     disabled:opacity-50 disabled:cursor-not-allowed
//                     text-zinc-700 dark:text-zinc-300
//                     font-medium text-sm
//                     transition-all duration-200
//                   "
//                 >
//                   Back
//                 </button>

//                 <button
//                   onClick={handleGenerate}
//                   disabled={isLoading}
//                   className="
//                     flex-[2] py-3.5
//                     rounded-xl
//                     bg-blue-500 hover:bg-blue-600
//                     disabled:bg-blue-400
//                     disabled:cursor-not-allowed
//                     text-white font-medium text-sm
//                     transition-all duration-200
//                     flex items-center justify-center gap-2
//                   "
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="
//                         w-4 h-4 rounded-full
//                         border-2 border-white/30
//                         border-t-white
//                         animate-spin
//                       "/>
//                       Generating your path...
//                     </>
//                   ) : (
//                     <>
//                       Generate My Roadmap
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                         <path d="M5 12h14M12 5l7 7-7 7"
//                           stroke="currentColor" strokeWidth="2"
//                           strokeLinecap="round" strokeLinejoin="round"
//                         />
//                       </svg>
//                     </>
//                   )}
//                 </button>
//               </div>

//             </div>
//           )}

//         </div>
//       </div>

//     </div>
//   )
// }

// export default OnboardingPage

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { createAssessment } from "../api/assessment.api"
import { generatePath } from "../api/path.api"

const goals = [
  {
    id: "Full Stack Development",
    label: "Full Stack Development",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "DSA & Competitive Programming",
    label: "DSA & Competitive Programming",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "Data Science",
    label: "Data Science",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "Android Development",
    label: "Android Development",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "DevOps & Cloud",
    label: "DevOps & Cloud",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const hoursOptions = [0.5, 1, 2, 3, 4, 5, 6]

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`
          w-7 h-7 rounded-full flex items-center justify-center
          text-xs font-semibold transition-all duration-300
          ${i + 1 === currentStep
            ? "bg-blue-500 text-white"
            : i + 1 < currentStep
              ? "bg-blue-500/20 text-blue-500 dark:text-blue-400"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
          }
        `}>
          {i + 1 < currentStep ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div className={`
            w-10 h-0.5 rounded-full transition-all duration-300
            ${i + 1 < currentStep ? "bg-blue-500" : "bg-zinc-200 dark:bg-zinc-700"}
          `} />
        )}
      </div>
    ))}
  </div>
)

const OnboardingPage = () => {
  const [step, setStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState("")
  const [targetWeeks, setTargetWeeks] = useState(8)
  const [hoursPerDay, setHoursPerDay] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const updateUser = useAuthStore((state) => state.updateUser)
  const navigate = useNavigate()

  const stepLabels = ["Choose Goal", "Set Timeline", "Generate Path"]

  const handleGenerate = async () => {
    setError("")
    setIsLoading(true)
    try {
      const assessmentData = await createAssessment({
        goal: selectedGoal,
        targetWeeks,
        hoursPerDay,
      })
      const assessmentId = assessmentData.assessment._id
      await generatePath(assessmentId)
      updateUser({ isOnboardingComplete: true })
      navigate("/home")
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="
      bg-white dark:bg-zinc-950
      transition-colors duration-300
      flex
      h-screen lg:overflow-hidden
    ">

      {/* LEFT — photo, desktop only */}
      <div className="hidden lg:block w-[42%] flex-shrink-0 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
          alt="Students learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-zinc-950/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white/90 text-base font-semibold leading-snug">
            "The best time to start learning
            <br />was yesterday. The next best time is now."
          </p>
          <p className="text-white/50 text-sm mt-2">— PathAI</p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="
        flex-1
        flex flex-col
        overflow-y-auto lg:overflow-hidden
      ">
        <div className="
          flex flex-col
          h-full
          px-6 sm:px-10 lg:px-12
          py-5 lg:py-6
          lg:justify-between
          gap-4 lg:gap-0
          max-w-lg lg:max-w-none
          mx-auto lg:mx-0
          w-full
        ">

          {/* TOP — logo + steps */}
          <div className="space-y-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-base text-zinc-900 dark:text-white">PathAI</span>
            </div>
            <div className="space-y-1">
              <StepIndicator currentStep={step} totalSteps={3} />
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Step {step} of 3 — {stepLabels[step - 1]}
              </p>
            </div>
          </div>

          {/* MIDDLE — step content */}
          <div className="flex-1 lg:flex lg:flex-col lg:justify-center">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    Let's make your{" "}
                    <span className="text-blue-500">learning personal</span>
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    What do you want to learn? Pick a goal to get started.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`
                        w-full px-3 py-2.5 rounded-xl border-2
                        flex items-center gap-3 text-left
                        transition-all duration-200
                        ${selectedGoal === goal.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-zinc-900 dark:text-white"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                        transition-colors duration-200
                        ${selectedGoal === goal.id
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        }
                      `}>
                        {goal.icon}
                      </div>
                      <span className="font-medium text-sm">{goal.label}</span>
                      {selectedGoal === goal.id && (
                        <div className="ml-auto w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    Set your <span className="text-blue-500">timeline</span>
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    How long do you have and how much time can you dedicate each day?
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {selectedGoal}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</label>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                      {targetWeeks} weeks
                    </span>
                  </div>
                  <input
                    type="range" min="1" max="24" value={targetWeeks}
                    onChange={(e) => setTargetWeeks(Number(e.target.value))}
                    className="w-full h-2 rounded-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>1 week</span>
                    <span>12 weeks</span>
                    <span>24 weeks</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                    Hours per day
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {hoursOptions.map((hour) => (
                      <button
                        key={hour}
                        onClick={() => setHoursPerDay(hour)}
                        className={`
                          py-2.5 rounded-xl text-xs font-medium border-2
                          transition-all duration-200
                          ${hoursPerDay === hour
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                          }
                        `}
                      >
                        {hour}h
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    Summary
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Goal", value: selectedGoal.split(" ")[0] },
                      { label: "Duration", value: `${targetWeeks}w` },
                      { label: "Daily", value: `${hoursPerDay}h` },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{item.value}</p>
                        <p className="text-xs text-zinc-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    Ready to generate{" "}
                    <span className="text-blue-500">your roadmap?</span>
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    Review your choices and click generate.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div className="px-4 py-2.5 bg-blue-50 dark:bg-blue-500/10 border-b border-zinc-200 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Your Learning Plan</p>
                  </div>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {[
                      { label: "Goal", value: selectedGoal },
                      { label: "Duration", value: `${targetWeeks} weeks` },
                      { label: "Daily Study", value: `${hoursPerDay}h per day` },
                      { label: "Total Hours", value: `~${targetWeeks * 7 * hoursPerDay}h` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-zinc-900">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    {error}
                  </div>
                )}

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" />
                      <path d="M12 16v-4M12 8h.01" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Groq AI will generate your personalized roadmap with curated links. Takes 5-10 seconds.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM — buttons */}
          <div className="flex-shrink-0 max-w-lg w-full mx-auto lg:mx-0 pt-3 lg:pt-0">

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={!selectedGoal}
                className="
                  w-full py-3 rounded-xl
                  bg-blue-500 hover:bg-blue-600
                  disabled:bg-zinc-200 dark:disabled:bg-zinc-800
                  disabled:text-zinc-400 dark:disabled:text-zinc-600
                  disabled:cursor-not-allowed
                  text-white font-medium text-sm
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {step === 2 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-sm transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-[2] py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 font-medium text-sm transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="flex-[2] py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate My Roadmap
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage