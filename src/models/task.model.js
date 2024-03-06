import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: {
      type: [String], // Array de strings para almacenar múltiples temas
      required: true,
      validate: {
        validator: function(value) {
          // Validar que los temas sean únicos
          return new Set(value).size === value.length;
        },
        message: props => `${props.value} contiene temas duplicados`,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
