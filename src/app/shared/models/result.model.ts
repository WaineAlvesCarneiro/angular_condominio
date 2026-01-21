// src\app\shared\models\result.model.ts

export interface Result<T> {
  sucesso: boolean;
  dados: T;
  erro?: string;
}