import { create } from 'zustand'

interface CreateSetOfQuestionStore {
 isOpen: boolean
 onOpen: () => void 
 onClose: () => void
}

const useCreateSetOfQuestionModal = create<CreateSetOfQuestionStore>((set) => ({
 isOpen: false,
 onOpen: () => set({ isOpen: true}),
 onClose: () => set({ isOpen: false})
}))

export default useCreateSetOfQuestionModal; 