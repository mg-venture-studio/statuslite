export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      status_pages: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          slug: string;
          description: string | null;
          custom_domain: string | null;
          theme: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          slug: string;
          description?: string | null;
          custom_domain?: string | null;
          theme?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          custom_domain?: string | null;
          theme?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      components: {
        Row: {
          id: string;
          status_page_id: string;
          name: string;
          description: string | null;
          status: string;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          status_page_id: string;
          name: string;
          description?: string | null;
          status?: string;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          status_page_id?: string;
          name?: string;
          description?: string | null;
          status?: string;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "components_status_page_id_fkey";
            columns: ["status_page_id"];
            isOneToOne: false;
            referencedRelation: "status_pages";
            referencedColumns: ["id"];
          }
        ];
      };
      incidents: {
        Row: {
          id: string;
          status_page_id: string;
          title: string;
          description: string | null;
          status: string;
          severity: string;
          started_at: string;
          resolved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          status_page_id: string;
          title: string;
          description?: string | null;
          status?: string;
          severity?: string;
          started_at?: string;
          resolved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          status_page_id?: string;
          title?: string;
          description?: string | null;
          status?: string;
          severity?: string;
          started_at?: string;
          resolved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "incidents_status_page_id_fkey";
            columns: ["status_page_id"];
            isOneToOne: false;
            referencedRelation: "status_pages";
            referencedColumns: ["id"];
          }
        ];
      };
      incident_updates: {
        Row: {
          id: string;
          incident_id: string;
          body: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          incident_id: string;
          body: string;
          status: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          incident_id?: string;
          body?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "incident_updates_incident_id_fkey";
            columns: ["incident_id"];
            isOneToOne: false;
            referencedRelation: "incidents";
            referencedColumns: ["id"];
          }
        ];
      };
      incident_components: {
        Row: {
          incident_id: string;
          component_id: string;
        };
        Insert: {
          incident_id: string;
          component_id: string;
        };
        Update: {
          incident_id?: string;
          component_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "incident_components_incident_id_fkey";
            columns: ["incident_id"];
            isOneToOne: false;
            referencedRelation: "incidents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "incident_components_component_id_fkey";
            columns: ["component_id"];
            isOneToOne: false;
            referencedRelation: "components";
            referencedColumns: ["id"];
          }
        ];
      };
      subscribers: {
        Row: {
          id: string;
          status_page_id: string;
          email: string;
          verified: boolean;
          verification_token: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          status_page_id: string;
          email: string;
          verified?: boolean;
          verification_token?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          status_page_id?: string;
          email?: string;
          verified?: boolean;
          verification_token?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscribers_status_page_id_fkey";
            columns: ["status_page_id"];
            isOneToOne: false;
            referencedRelation: "status_pages";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
