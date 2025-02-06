export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserObservation {
  gps_location: Location;
  mosquito_img: string;
  date?: Date;
}

export interface IdentificationTask {
  user_observation: UserObservation;
  status: '0' | '1' | '2';
}


export interface BasicAPIResponse{

  ok:boolean;
  msg:string;
  data?: IdentificationTask[]

}
