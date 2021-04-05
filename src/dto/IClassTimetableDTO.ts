export interface ClassTimetableDTO {
  id: string;
  class_id: string;
  class_status: string;
  date: Date;
  students_presence: {
    string: {
      name: string;
      present: boolean | null;
      homework: boolean | null;
      status: string;
    };
  };
  class_number: number;
}

export interface StudentsTimetableDTO {
  name: string;
  present: boolean | null;
  homework: boolean | null;
  status: string;
}
