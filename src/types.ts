export type Id = string | number;

export type TodoStatus = 'New' | 'Ongoing' | 'Done';

export type Todo = {
    id: Id;
    title: string;
    description: string;
    status: TodoStatus;
}

export type Column = {
    id: Id;
    title: string;
    color: string;
    items: Todo[];
}