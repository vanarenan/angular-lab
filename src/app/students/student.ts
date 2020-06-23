export interface Student {
    id?: number;
    name: string;
    group: string;
    points: {
      subjectId: number;
      point: number;
    }[];
}
