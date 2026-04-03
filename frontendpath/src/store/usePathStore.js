import {create} from "zustand"

const usePathStore = create((set)=>({
    // ================================
  // STATE
  // ================================

   selectedWeek:null,

   // which week card user clicked
  // null means no week selected
  // number means that week is open

   isBottomSheetOpen:false,

   // controls bottom sheet visibility

   currentPathId:null,
     // which path is currently open
  // set when user navigates to PathPage

  openWeek:(weekNumber)=>
    set({
        selectedWeek:weekNumber,
        isBottomSheetOpen:true,
    }),

    // called when user clicks a week card
  // opens bottom sheet for that week

   closeBottomSheet:()=>
    set({
        selectedWeek:null,
        isBottomSheetOpen:false,
    }),

    setCurrentPathId:(pathId)=>
        set({
            currentPathId:pathId
        }),

        clearPath:()=>
            set({
                selectedWeek:null,
                isBottomSheetOpen:false,
                currentPathId:null,
            })
}))

export default usePathStore