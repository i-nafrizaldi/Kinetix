import cors from "cors";
import express, {
  json,
  urlencoded,
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { PORT } from "./config.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { AuthRouter } from "./routers/auth.router.js";
import { ProductRouter } from "./routers/product.router.js";
import { UserRouter } from "./routers/user.router.js";

export default class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not found !");
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          // console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }
  private routes(): void {
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();
    const productRouter = new ProductRouter();

    this.app.get("/api", (req: Request, res: Response) => {
      res.send(`Hello, Welcome to Kinetix API !`);
    });

    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/auth", authRouter.getRouter());
    this.app.use("/api/product", productRouter.getRouter());

    this.app.use(errorMiddleware);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
