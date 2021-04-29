import { StringMappingType } from 'typescript';

export interface ClassDetailsDTO {
  retrievedClasses: {
    id: string;
    class_id: string;
    class_level: string;
    class_day: string;
    class_hour: string;
    class_duration: number;
    weeks_duration: number;
    start_date: Date;
    teacher_id: string;
    teacher: {
      id: string;
      teacher_name: string;
      teacher_email: string;
    };
    classes_x_students: [
      {
        id: string;
        class_id: string;
        class_name: string;
        student_id: string;
        student_name: string;
      },
    ];
  };
  retrievedTimetable: [
    {
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
    },
  ];
}

export interface RetrievedTimetableDTO {
  id: string;
  class_id: string;
  class_status: string;
  date: Date;
  formattedDate?: string;
  class_number: number;
  updated_at: Date;
  students_presence: {
    string: {
      name: string;
      present: boolean | null;
      homework: boolean | null;
      status: string;
    };
  };
}
