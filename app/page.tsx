// import { Suspense } from "react"
// import { DateRequestFlow } from "@/components/date-request/date-request-flow"

// export default function Page() {
//   return (
//     <Suspense fallback={null}>
//       <DateRequestFlow />
//     </Suspense>
//   )
// }
import { Suspense } from "react"
import { DateRequestFlow } from "@/components/date-request/date-request-flow"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DateRequestFlow />
    </Suspense>
  )
}