export class Constant {
  public static readonly NORMAL: string = 'NORMAL';
  public static readonly DELETE: string = 'DELETE';
  public static readonly WITHDRAW: string = 'WITHDRAW';
  public static readonly SUSPEND: string = 'SUSPEND';

  public static readonly SELECT_NOT_FOUND: string = 'SELECT_NOT_FOUND';
  public static readonly UPDATE_NOT_FOUND: string = 'UPDATE_NOT_FOUND';
  public static readonly DELETE_NOT_FOUND: string = 'DELETE_NOT_FOUND';
  public static readonly UNAUTHORIZED: string = 'UNAUTHORIZED';

  public static readonly HEADER_KEY: string = 'authorization';
}

export class RoleConst {
  public static readonly ALL: string = 'ALL';
  public static readonly ADMIN: string = 'ADMIN';
  public static readonly DUKE: string = 'DUKE';
  public static readonly MARQUIS: string = 'MARQUIS';
  public static readonly COUNT: string = 'COUNT';
  public static readonly BARON: string = 'BARON';
  public static readonly KNIGHT: string = 'KNIGHT';

  public static readonly userRoles = [RoleConst.DUKE, RoleConst.MARQUIS, RoleConst.COUNT, RoleConst.BARON, RoleConst.KNIGHT];
}

export class SoldierConst {
  public static readonly INFANTRY: string = 'INFANTRY';
  public static readonly CAVALRY: string = 'CAVALRY';
  public static readonly SPEARMAN: string = 'SPEARMAN';
  public static readonly ARCHER: string = 'ARCHER';
  public static readonly soldiers = [SoldierConst.INFANTRY, SoldierConst.CAVALRY, SoldierConst.SPEARMAN, SoldierConst.ARCHER];
}

export class Message {
  public static readonly NOT_UPDATE_DATA: string = '수정할 데이터 없음';
  public static readonly NOT_DELETE_DATA: string = '삭제할 데이터 없음';
  public static readonly UNAUTHORIZED_USER: string = '인증되어있지 않음';
  public static readonly DISALLOWED_USER: string = '허용되지 않은 사용자';
  public static readonly EXPIRATION_AUTHORIZED: string = '인증 만료됨';
  public static readonly NOT_FOUND_USER: string = '허용되지 않은 사용자';

  public static readonly DUPLICATE_DATA: string = '중복 데이터';
}
