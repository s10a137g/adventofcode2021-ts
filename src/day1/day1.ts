export const day1_1 = (args: string[]): number => {
  const nums = args.map(v => +v)
  const initialValue = 0

  return nums.reduce((acc: number, val: number, index: number): number => {
    if (index != 0 && val > nums[index - 1]) {
      return acc + 1
    } else {
      return acc
    }
  }, initialValue)
}

export const day1_2 = (args: string[]): number => {
  const nums = args.map(v => +v.split(' ')[0])
  const initialValue = 0

  return nums.reduce((acc: number, val: number, index: number): number => {
    if (index > 2) {
      const currentDepth = val + nums[index - 1] + nums[index - 2]
      const previousDepth = nums[index - 1] + nums[index - 2] + nums[index - 3]

      return currentDepth > previousDepth ? acc + 1 : acc
    } else {
      return acc
    }
  }, initialValue)
}
