import { PatientList } from "@/components/admin/Patients"

const data: User[] = [
    {
        "id": 3,
        "name": "Pyae Pyae",
        "email": "ayewinwin510@gmail.com",
        "phone": "84161945",
        "address": "Singapore",
        "role": "USER",
        "active": true
    },
    {
        "id": 6,
        "name": "aye aye",
        "email": "ayewinwin9901@gmail.com",
        "phone": "84161945",
        "address": "Singapore",
        "role": "USER",
        "active": true
    }
]


export default function Page() {
    return (
        <div>
            <PatientList />
        </div>
    )
}
