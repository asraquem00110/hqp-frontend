import DashboardComponent from "@/components/DashboardComponent"
import BarangayIndexComponent from "@/components/barangay/indexComponent"
import UserIndexComponent from "@/components/user/indexComponent"
import StreetComponent from "@/components/street/indexComponent"
import FamilyComponent from "@/components/family/indexComponent"
import NewFamilyComponent from "@/components/family/createComponent"
import familyDetailComponent from "@/components/family/detailsComponent"
import passComponent from "@/components/family/passComponent"
import passAllComponent from "@/components/family/passAllComponent"

const routes = [
	{path: `/`,component: DashboardComponent,name: 'dashboard'},
	{path: `/barangay`,component: BarangayIndexComponent, name: 'barangay'},
	{path: `/user`,component: UserIndexComponent, name: 'user'},
	{path: `/barangay/:barangay/:id`,component: StreetComponent, name: 'barangaystreets'},
	{path: `/family`,component: FamilyComponent,name: 'family'},
	{path: `/family/create`,component: NewFamilyComponent, name: 'newFamily'},
	{path: `/family/details/:id`,component: familyDetailComponent, name: 'familyDetails'},
	{path: `/familyPass/:id`,component: passComponent,name: 'familyPass'},
	{path: `/QuarantinePass/all`,component: passAllComponent,name: 'familyPassAll'}
]

export default {
	routes
}
