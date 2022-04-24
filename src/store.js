import create from 'zustand'

// const useStore = create((set, get) => {
//   return {
//     test: 'test data yeah',
//     update(test) {
//       set(test => ({ test }))
//     },
//   }
// })

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  test: 'test data yeah',
  update(test) {
    set(() => ({ test }))
  },
}))

export default useStore
